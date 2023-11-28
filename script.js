// Your original XML code
var originalXmlCode = `<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State">
	<settings pass="offlineServicing"></settings>
	<settings pass="windowsPE">
		<component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
			<SetupUILanguage>
				<UILanguage>tr-TR</UILanguage>
			</SetupUILanguage>
			<InputLocale>041f:0000041f</InputLocale>
			<SystemLocale>tr-TR</SystemLocale>
			<UILanguage>tr-TR</UILanguage>
			<UserLocale>tr-TR</UserLocale>
		</component>
		<component name="Microsoft-Windows-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
			<UserData>
				<ProductKey>
					<Key>VK7JG-NPHTM-C97JM-9MPGT-3V66T</Key>
				</ProductKey>
				<AcceptEula>true</AcceptEula>
			</UserData>
		</component>
	</settings>
	<settings pass="generalize"></settings>
	<settings pass="specialize"></settings>
	<settings pass="auditSystem"></settings>
	<settings pass="auditUser"></settings>
	<settings pass="oobeSystem">
		<component name="Microsoft-Windows-International-Core" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
			<InputLocale>041f:0000041f</InputLocale>
			<SystemLocale>tr-TR</SystemLocale>
			<UILanguage>tr-TR</UILanguage>
			<UserLocale>tr-TR</UserLocale>
		</component>
		<component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS">
			<OOBE>
				<ProtectYourPC>3</ProtectYourPC>
				<HideEULAPage>true</HideEULAPage>
				<HideWirelessSetupInOOBE>false</HideWirelessSetupInOOBE>
			</OOBE>
		</component>
	</settings>
</unattend>`;

// Set the text of the code element to your XML code
document.getElementById('xmlCode').textContent = originalXmlCode;

// New Dropdown Function
function changeText(choice) {
    var xmlCode = originalXmlCode.replace(/VK7JG-NPHTM-C97JM-9MPGT-3V66T/g, choice);
    document.getElementById('xmlCode').textContent = xmlCode;
    Prism.highlightAll(); // Highlight the original code
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.checkbox input').addEventListener('change', function() {
        var xmlCode = originalXmlCode;
        if (this.checked) {
            var bypassCode = `
            <RunSynchronous>
                <RunSynchronousCommand wcm:action="add">
                    <Order>1</Order>
                    <Path>reg.exe add "HKLM\\SYSTEM\\Setup\\LabConfig" /v BypassTPMCheck /t REG_DWORD /d 1 /f</Path>
                </RunSynchronousCommand>
                <RunSynchronousCommand wcm:action="add">
                    <Order>2</Order>
                    <Path>reg.exe add "HKLM\\SYSTEM\\Setup\\LabConfig" /v BypassSecureBootCheck /t REG_DWORD /d 1 /f</Path>
                </RunSynchronousCommand>
                <RunSynchronousCommand wcm:action="add">
                    <Order>3</Order>
                    <Path>reg.exe add "HKLM\\SYSTEM\\Setup\\LabConfig" /v BypassStorageCheck /t REG_DWORD /d 1 /f</Path>
                </RunSynchronousCommand>
                <RunSynchronousCommand wcm:action="add">
                    <Order>4</Order>
                    <Path>reg.exe add "HKLM\\SYSTEM\\Setup\\LabConfig" /v BypassRAMCheck /t REG_DWORD /d 1 /f</Path>
                </RunSynchronousCommand>
            </RunSynchronous>`;
            var userDataEndTag = '</UserData>';
            var index = xmlCode.indexOf(userDataEndTag);
            if (index !== -1) {
                xmlCode = xmlCode.slice(0, index + userDataEndTag.length) + bypassCode + xmlCode.slice(index + userDataEndTag.length);
                document.getElementById('xmlCode').textContent = xmlCode;
                Prism.highlightAll(); // Highlight the new code
            }
        } else {
            // If the checkbox is unchecked, reset the XML code to the original
            document.getElementById('xmlCode').textContent = xmlCode;
            Prism.highlightAll(); // Highlight the original code
        }
    });
});
