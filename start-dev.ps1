$ErrorActionPreference = "Stop"

$ProjectRoot = Join-Path $PSScriptRoot "react-tailwind"
$HostName = "127.0.0.1"
$Port = 3000
$Url = "http://${HostName}:$Port"
$LogFile = Join-Path $ProjectRoot "next-dev.manual.log"

function Open-DevUrl {
  Write-Host "Opening browser:" -ForegroundColor Cyan
  Write-Host $Url
  try {
    Start-Process -FilePath "explorer.exe" -ArgumentList $Url
  } catch {
    Write-Host "Could not open browser automatically. Copy this URL manually:" -ForegroundColor Yellow
    Write-Host $Url
  }
}

function Test-DevServer {
  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

if (!(Test-Path $ProjectRoot)) {
  Write-Host "Cannot find project folder: $ProjectRoot" -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

if (!(Test-Path (Join-Path $ProjectRoot "package.json"))) {
  Write-Host "Cannot find package.json in: $ProjectRoot" -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

if (Test-DevServer) {
  Write-Host "Dev server is already running:" -ForegroundColor Green
  Write-Host $Url
  Open-DevUrl
  Write-Host ""
  Read-Host "Press Enter to close this helper window"
  exit 0
}

Set-Location $ProjectRoot

if (!(Test-Path (Join-Path $ProjectRoot "node_modules"))) {
  Write-Host "node_modules not found. Please run npm install in react-tailwind first." -ForegroundColor Yellow
  Read-Host "Press Enter to close"
  exit 1
}

Write-Host "Starting H2 Architecture AI frontend..." -ForegroundColor Cyan
Write-Host "Project: $ProjectRoot"
Write-Host "URL:     $Url"
Write-Host "Log:     $LogFile"
Write-Host ""
Write-Host "Keep this window open while developing. Close it to stop the dev server." -ForegroundColor Yellow
Write-Host ""

Open-DevUrl

npm run dev -- --hostname $HostName --port $Port 2>&1 | Tee-Object -FilePath $LogFile
