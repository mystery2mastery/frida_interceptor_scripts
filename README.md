This is a collection of Frida Interceptor definitions for Windows API that are commonly abused by malware. This is a derivative of my larger Frida based dynamic malware analysis project. All the definitions are written by me. I will update the list of API in my free time.

## List of win32 API

### Generic

- [x] LoadLibraryA
- [x] LoadLibraryW
- [x] LoadLibraryExA
- [x] LoadLibraryExW
- [x] GetProcAddress
- [x] GetModuleHandleA
- [x] GetModuleHandleW
- [x] GetModuleHandleExA
- [x] GetModuleHandleExW
- [x] WinExec
- [ ] ShellExecute

### Memory

- [ ] VirtualAlloc
- [ ] VirtualAllocEx
- [ ] VirtualProtect
- [ ] VirtualProtectEx
- [ ] ReadProcessMemory
- [ ] WriteProcessMemoryA/W
- [ ] memcpy
- [ ] HeapAlloc

### Crypto

- [ ] CryptEncrypt
- [ ] CryptDecrypt
- [ ] CryptAcquireContext
- [ ] CryptGenKey
- [ ] CryptDeriveKey
- [ ] BCryptDecrypt

### Internet

- [ ] InternetOpen
- [ ] InternetOpenUrl
- [ ] InternetConnect
- [ ] HttpOpenRequest
- [ ] InternetReadFile
- [ ] InternetWriteFile

### WinAPI Sockets

- [ ] WSAStartup
- [ ] bind
- [ ] listen
- [ ] accept
- [ ] connect
- [ ] recv
- [ ] send

### Process

- [ ] OpenProcess
- [ ] CreateProcessAsUserA
- [ ] CreateProcessAsUserW
- [ ] CreateProcessA
- [ ] CreateProcessW
- [ ] EnumProcesses
- [ ] CreateProcessInternalA/W
- [ ] QueueUserAPC

### Thread

- [ ] CreateRemoteThread
- [ ] CreateRemoteThreadEx
- [ ] OpenThread
- [ ] GetThreadContext
- [ ] SetThreadContext
- [ ] SuspendThread
- [ ] ResumeThread

### Registry

- [ ] RegCreateKeyEx
- [ ] RegOpenKeyEx
- [ ] RegSetValueEx
- [ ] RegQueryValue
- [ ] RegDeleteKeyEx
- [ ] RegGetValue

### File

- [ ] GetTempPath
- [ ] CopyFile
- [ ] CreateFileA/W
- [ ] WriteFile
- [ ] ReadFile

### Service

- [ ] OpenSCManager
- [ ] CreateService

### Anti-Analysis/VM/Debug

- [ ] IsDebuggerPresent
- [ ] GetSystemInfo
- [ ] GetVersion
- [ ] GlobalMemoryStatusEx
- [ ] CreateToolhelp32Snapshot
- [ ] Process32First
- [ ] Process32Next
- [ ] Thread32First
- [ ] Thread32Next

### Resource section

- [ ] FindResource
- [ ] LoadResource
- [ ] LockResource

### Miscellaneous

- [ ] GetAsyncKeyState  --> keyloggger
- [ ] SetWindowsHookEx  --> keylogger
- [ ] GetForeGroundWindow  --> get running window name
- [ ] GetDC  --> Screen shot realted
- [ ] BitBlt  --> Screenshot related





## List of Nt/Zw API:

### Memory

- [ ] NtAllocateVirtualMemory
- [ ] NtWriteVirtualMemory
- [ ] Nt/ZwUnmapViewOfSection

### Thread

- [ ] NtResumeThread
- [ ] NtCreateThreadEx
- [ ] RtlCreateUserThread
