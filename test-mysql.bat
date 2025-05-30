@echo off
echo Conectando ao banco de dados MySQL no container...

REM Verifica se está usando dockerd/moby ou containerd
where docker >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Usando motor dockerd/moby
    docker exec -it legacy_ap_mysql mysql -uuser -ppassword legacy_ap
) else (
    echo Usando motor containerd com nerdctl
    nerdctl exec -it legacy_ap_mysql mysql -uuser -ppassword legacy_ap
)