import { useI18n } from 'vue-i18n';

const { t } = useI18n();

export default [
    {
        id: 1,
        name: t('Packages.base.name'),
        features: [
            t('Packages.base.features.size'),
            t('Packages.base.features.support'),
            t('Packages.base.features.prompts')
        ],
        price: t('Packages.base.price')
    }
]
