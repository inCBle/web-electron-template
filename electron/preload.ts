import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
    setTitle: (title: string) => {
        ipcRenderer.send('set-title', title)
    },
    getTitle: () => {
        return ipcRenderer.invoke('get-title')
    },
    onMessage: (callback: (...args: any[]) => void) => {
        ipcRenderer.on('sand-message', (_, ...args) => callback(...args))
    }
})

