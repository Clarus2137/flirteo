import { boot } from 'quasar/wrappers';
import { useUserStore } from 'src/stores/userStore';

export default boot(() => {
    const userStore = useUserStore();
    // const router = useRouter();
    // const router = userStore.router;

    document.addEventListener('deviceready', () => {
        (window as any).handleOpenURL = (url: string) => {
            setTimeout(() => {
                if (url.startsWith('flirteo://reset-password')) {
                    const token = url.split('/').pop() as string;
                    userStore.setPassToken(token); // Сохраните токен в хранилище
                    userStore.importedRouter.push({ name: 'reset' });
                }
            }, 0);
        };
    });
});
