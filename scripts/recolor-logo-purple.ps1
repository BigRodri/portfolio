# Remap logo purple to site primary #79538e, preserving white + antialias along OLD<->white.
param(
  [string]$InputPath = (Join-Path $PSScriptRoot '..\public\logo-ruxd.png'),
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\public\logo-ruxd.png'),
  [int]$OldR = 80,
  [int]$OldG = 40,
  [int]$OldB = 93
)

Add-Type -AssemblyName System.Drawing

$OLD0 = $OldR
$OLD1 = $OldG
$OLD2 = $OldB
$NEW0 = 0x79; $NEW1 = 0x53; $NEW2 = 0x8e
$W0 = 255; $W1 = 255; $W2 = 255

$v0 = $W0 - $OLD0
$v1 = $W1 - $OLD1
$v2 = $W2 - $OLD2
$len2 = [double](($v0 * $v0) + ($v1 * $v1) + ($v2 * $v2))
if ($len2 -lt 1) { throw 'Invalid OLD/W' }

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path $InputPath))
$rect = [System.Drawing.Rectangle]::new(0, 0, $bmp.Width, $bmp.Height)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$absStride = [math]::Abs($stride)
$buf = New-Object byte[] ($absStride * $bmp.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $buf.Length)

for ($y = 0; $y -lt $bmp.Height; $y++) {
  $row = $y * $absStride
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    $i = $row + ($x * 4)
    $pb = $buf[$i]
    $pg = $buf[$i + 1]
    $pr = $buf[$i + 2]
    $pa = $buf[$i + 3]
    if ($pa -lt 5) { continue }

    $p0 = [int]$pr
    $p1 = [int]$pg
    $p2 = [int]$pb

    $po0 = $p0 - $OLD0
    $po1 = $p1 - $OLD1
    $po2 = $p2 - $OLD2
    $t = ($po0 * $v0 + $po1 * $v1 + $po2 * $v2) / $len2
    if ($t -lt 0) { $t = 0 }
    elseif ($t -gt 1) { $t = 1 }

    $q0 = [int][math]::Round($OLD0 + $t * $v0)
    $q1 = [int][math]::Round($OLD1 + $t * $v1)
    $q2 = [int][math]::Round($OLD2 + $t * $v2)

    $dx = $p0 - $q0
    $dy = $p1 - $q1
    $dz = $p2 - $q2
    $dseg = [math]::Sqrt($dx * $dx + $dy * $dy + $dz * $dz)

    if ($dseg -lt 32) {
      $nw0 = $W0 - $NEW0
      $nw1 = $W1 - $NEW1
      $nw2 = $W2 - $NEW2
      $np0 = [int][math]::Round($NEW0 + $t * $nw0)
      $np1 = [int][math]::Round($NEW1 + $t * $nw1)
      $np2 = [int][math]::Round($NEW2 + $t * $nw2)
      $buf[$i] = [byte][math]::Max(0, [math]::Min(255, $np2))
      $buf[$i + 1] = [byte][math]::Max(0, [math]::Min(255, $np1))
      $buf[$i + 2] = [byte][math]::Max(0, [math]::Min(255, $np0))
    }
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $data.Scan0, $buf.Length)
$bmp.UnlockBits($data)
$outFull = [System.IO.Path]::GetFullPath($OutputPath)
$tmpFull = [System.IO.Path]::ChangeExtension([System.IO.Path]::GetTempFileName(), '.png')
$bmp.Save($tmpFull, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Copy-Item -LiteralPath $tmpFull -Destination $outFull -Force
Remove-Item -LiteralPath $tmpFull -Force
Write-Host "Wrote $outFull"
