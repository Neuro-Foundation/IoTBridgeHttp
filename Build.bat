"C:\Program Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\MSBuild.exe" ^
	"C:\My Projects\IoTBridgeHttp\Build\Build.csproj" ^
	-t:BuildSetup ^
	-p:Configuration=Release

if errorlevel 1 goto Error

"C:\My Projects\IoTGateway\Utilities\Waher.Utility.Install\bin\Release\PublishOutput\win-x86\Waher.Utility.Install.exe" ^
	-dk IoTBridgeHttp.Dockerfile ^
	-de IoTBridgeHttp.env ^
	-d "/var/lib/IoT Gateway" ^
	-a "/var/lib/IoT Gateway" ^
	-s "/opt/IoTGateway/ConsoleBridge" ^
	-m ConsoleBridge\bin\Release\PublishOutputLinux\linux-x64\ConsoleBridge.manifest

docker build -f IoTBridgeHttp.Dockerfile -t iot-bridge-http:latest .

goto Done

:Error

:Done

echo  
