@echo off
echo Iniciando os serviços no Rancher Desktop...

REM Verifica se está usando dockerd/moby ou containerd
where docker >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Usando motor dockerd/moby
    docker compose -f rancher-compose.yml up -d
) else (
    echo Usando motor containerd com nerdctl
    nerdctl compose -f rancher-compose.yml up -d
)

echo.
echo Serviços iniciados!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.