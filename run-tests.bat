@echo off
echo Executando testes do backend...
cd /d C:\Projetos\modernizarCodigo\backend
call npm test -- --passWithNoTests
echo.
echo Executando testes do frontend...
cd /d C:\Projetos\modernizarCodigo\frontend
call npm test -- --passWithNoTests
echo.
echo Testes concluídos.
pause
REM End of run-tests.bat