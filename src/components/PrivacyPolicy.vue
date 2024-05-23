<script setup lang="ts">

</script>



<template>
    <BackBtn />
    <div class="privacy">
        <h1 class="lexend-bold text-lg text-center leading-normal mb-5">{{ $t('Terms_and_Privacy.Privacy') }}</h1>
        <p class="lexend-bold text-lg mt-5 mb-3">1. Informacje ogólne</p>
        <p class="lexend mb-1.5">Niniejsza Polityka Prywatności określa zasady
            przetwarzania i ochrony danych osobowych użytkowników aplikacji mobilnej Flirteo, dostępnej pod adresem
            <a href="https://www.flirteo.eu" class="text-gradient-primary lexend-bold">www.flirteo.eu</a> (dalej
            "Aplikacja").
        </p>
        <p class="lexend-bold text-lg mt-5 mb-3">2. Administrator Danych Osobowych</p>
        <p class="lexend mb-1.5">Administratorem Twoich danych osobowych jest
            Web Systems, z siedzibą przy Ul. Gen. Jarosława Dąbrowskiego 249/lokal 23
            95-020 Łódź, NIP: 7292462454 (dalej "Administrator").</p>
        <p class="lexend-bold text-lg mt-5 mb-3">3. Zakres zbieranych danych</p>
        <p class="lexend mb-1.5">W ramach korzystania z Aplikacji, możemy
            zbierać następujące dane osobowe:</p>
        <ul class="text-base">
            <li>Imię i nazwisko</li>
            <li>Adres e-mail</li>
            <li>Numer telefonu</li>
            <li>Wiek</li>
            <li>Płeć</li>
            <li>Wyksztalcenie</li>
            <li>Dane lokalizacyjne</li>
            <li>Informacje o urządzeniu</li>
            <li>Historia aktywności w Aplikacji</li>
        </ul>
        <p class="lexend-bold text-lg mt-5 mb-3">4. Cel przetwarzania danych</p>
        <p class="lexend mb-1.5">Dane osobowe zbierane są w celu:</p>
        <ul class="text-base">
            <li>Świadczenia usług oferowanych przez Aplikację</li>
            <li>Umożliwienia kontaktu między użytkownikami</li>
            <li>Personalizacji usług i dostosowania oferty do preferencji użytkowników</li>
            <li>Prowadzenia działań marketingowych i promocyjnych</li>
            <li>Prowadzenia analiz statystycznych</li>
            <li>Zapewniania bezpieczeństwa usług</li>
        </ul>
        <p class="lexend-bold text-lg mt-5 mb-3">5. Podstawa prawna przetwarzania danych</p>
        <p class="lexend mb-1.5">Podstawą prawną przetwarzania danych osobowych
            jest:</p>
        <ul class="text-base">
            <li>Zgoda użytkownika (art. 6 ust. 1 lit. a RODO)</li>
            <li>Realizacja umowy (art. 6 ust. 1 lit. b RODO)</li>
            <li>Prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO)</li>
        </ul>
        <p class="lexend-bold text-lg mt-5 mb-3">6. Odbiorcy danych</p>
        <p class="lexend mb-1.5">Dane osobowe mogą być udostępniane następującym
            odbiorcom:</p>
        <ul class="text-base">
            <li>Podmiotom przetwarzającym dane na zlecenie Administratora (np. dostawcy usług IT)</li>
            <li>Organom ścigania i innym organom państwowym, na mocy obowiązujących przepisów prawa</li>
        </ul>
        <p class="lexend-bold text-lg mt-5 mb-3">7. Prawa użytkowników</p>
        <p class="lexend mb-1.5">Użytkownikom przysługują następujące prawa:</p>
        <ul class="text-base">
            <li>Prawo dostępu do danych</li>
            <li>Prawo do sprostowania danych</li>
            <li>Prawo do usunięcia danych</li>
            <li>Prawo do ograniczenia przetwarzania</li>
            <li>Prawo do przenoszenia danych</li>
            <li>Prawo do wniesienia sprzeciwu wobec przetwarzania danych</li>
            <li>Prawo do wycofania zgody na przetwarzanie danych</li>
        </ul>
        <p class="lexend-bold text-lg mt-5 mb-3">8. Okres przechowywania danych</p>
        <p class="lexend ">Dane osobowe będą przechowywane przez okres
            niezbędny do realizacji celów, dla których zostały zebrane, a także zgodnie z obowiązującymi przepisami
            prawa.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">9. Środki bezpieczeństwa</p>
        <p class="lexend mb-1.5">Administrator stosuje odpowiednie środki
            techniczne i organizacyjne w celu zapewnienia ochrony danych osobowych przed ich przypadkowym lub niezgodnym
            z prawem zniszczeniem, utratą, zmianą, nieuprawnionym ujawnieniem lub dostępem.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">10. Zmiany w Polityce Prywatności</p>
        <p class="lexend mb-1.5">Administrator zastrzega sobie prawo do
            wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie zmiany będą publikowane na stronie
            internetowej Aplikacji i wchodzą w życie z dniem ich publikacji.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">11. Kontakt</p>
        <p class="lexend mb-1.5">W razie jakichkolwiek pytań lub wątpliwości
            dotyczących niniejszej Polityki Prywatności, prosimy o kontakt pod adresem e-mail: <span
                class="text-gradient-primary lexend-bold">hello@flirteo.eu</span></p>
        <hr class="my-8">
        <p class="lexend mb-1.5">Niniejsza Polityka Prywatności obowiązuje od
            dnia <span class="text-gradient-primary lexend-bold">23.05.2024</span>.</p>
    </div>
</template>



<style scoped lang="scss">
.dark-mode ul {
    color: #a3999c;
}

ul {
    list-style: disc;
    padding-left: 20px;
    color: #6b6466;
}
</style>
