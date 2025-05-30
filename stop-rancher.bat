@echo off
echo Parando os serviços no Rancher Desktop...

REM Verifica se está usando dockerd/moby ou containerd
where docker >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Usando motor dockerd/moby
    docker compose -f rancher-compose.yml down
) else (
    echo Usando motor containerd com nerdctl
    nerdctl compose -f rancher-compose.yml down
)

echo.
echo Serviços parados!