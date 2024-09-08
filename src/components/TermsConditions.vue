<script setup lang="ts">

</script>



<template>
    <BackBtn />
    <div class="terms">
        <h1 class="lexend-bold text-xl text-center leading-normal">{{ $t('Terms_and_Privacy.Terms') }}</h1>
        <p class="lexend-bold text-lg mt-5 mb-3">1. Postanowienia ogólne</p>
        <p class="lexend mb-1.5">1.1. Niniejsze Warunki i Zasady określają zasady korzystania z aplikacji mobilnej
            Flirteo, dostępnej pod adresem <a href="http://www.flirteo.eu"
                class="text-gradient-primary lexend-bold">www.flirteo.eu</a> (dalej "Aplikacja").</p>
        <p class="lexend mb-1.5">1.2. Aplikacja jest własnością Web Systems, z siedzibą przy Ul. Gen. Jarosława
            Dąbrowskiego 249/lokal 23
            95-020 Łódź, NIP: 7292462454 (dalej "Operator").</p>
        <p class="lexend mb-1.5">1.3. Korzystanie z Aplikacji oznacza akceptację niniejszych Warunków i Zasad.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">2. Rejestracja i Konto Użytkownika</p>
        <p class="lexend mb-1.5">2.1. Aby korzystać z Aplikacji, użytkownik musi zarejestrować się, tworząc konto
            użytkownika.</p>
        <p class="lexend mb-1.5">2.2. Rejestracja wymaga podania prawdziwych i aktualnych danych osobowych, takich jak
            imię, nazwisko, adres e-mail oraz hasło.</p>
        <p class="lexend mb-1.5">2.3. Użytkownik jest odpowiedzialny za zachowanie poufności swojego hasła i innych
            danych związanych z kontem.</p>
        <p class="lexend mb-1.5">2.4. Użytkownik zobowiązuje się do nieudostępniania swojego konta innym osobom oraz do
            natychmiastowego powiadomienia Operatora o wszelkich nieautoryzowanych użyciach konta.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">3. Zasady Korzystania z Aplikacji</p>
        <p class="lexend mb-1.5">3.1. Użytkownik zobowiązuje się do korzystania z Aplikacji zgodnie z jej
            przeznaczeniem, przepisami prawa oraz niniejszymi Warunkami i Zasadami.</p>
        <p class="lexend mb-1.5">3.2. Zabrania się:</p>
        <ul class="text-base">
            <li>Publikowania treści niezgodnych z prawem, wulgarnych, obraźliwych lub naruszających prawa osób trzecich.
            </li>
            <li>Używania Aplikacji do wysyłania niezamówionych informacji handlowych (spam).</li>
            <li>Podejmowania działań mogących zakłócić funkcjonowanie Aplikacji lub naruszyć prywatność innych
                użytkowników.</li>
        </ul>
        <p class="lexend mb-1.5">3.3. Operator zastrzega sobie prawo do usunięcia treści, które naruszają powyższe
            zasady oraz do zablokowania konta użytkownika, który je narusza.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">4. Prawa i Obowiązki Operatora</p>
        <p class="lexend mb-1.5">4.1. Operator zobowiązuje się do dołożenia wszelkich starań w celu zapewnienia
            poprawnego działania Aplikacji oraz ochrony danych osobowych użytkowników.</p>
        <p class="lexend mb-1.5">4.2. Operator zastrzega sobie prawo do czasowego zawieszenia działania Aplikacji z
            powodów technicznych, konserwacyjnych lub z innych ważnych przyczyn.</p>
        <p class="lexend mb-1.5">4.3. Operator nie ponosi odpowiedzialności za szkody wynikłe z nieautoryzowanego
            dostępu do konta użytkownika lub z korzystania z Aplikacji niezgodnie z jej przeznaczeniem.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">5. Prawa Autorskie</p>
        <p class="lexend mb-1.5">5.1. Wszystkie treści dostępne w Aplikacji, w tym teksty, grafiki, logo, ikony, obrazy,
            klipy audio i wideo, są własnością Operatora lub licencjodawców i są chronione prawem autorskim oraz innymi
            przepisami prawa dotyczącymi własności intelektualnej.</p>
        <p class="lexend mb-1.5">5.2. Użytkownik zobowiązuje się do niekopiowania, nieprzekazywania ani nieużywania
            treści dostępnych w Aplikacji w celach komercyjnych bez uprzedniej pisemnej zgody Operatora.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">6. Rozwiązanie Umowy</p>
        <p class="lexend mb-1.5">6.1. Użytkownik może w każdej chwili usunąć swoje konto w Aplikacji, co jest
            równoznaczne z rozwiązaniem umowy z Operatorem.</p>
        <p class="lexend mb-1.5">6.2. Operator zastrzega sobie prawo do rozwiązania umowy i usunięcia konta użytkownika
            w przypadku naruszenia przez użytkownika niniejszych Warunków i Zasad.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">7. Zmiany w Warunkach i Zasadach</p>
        <p class="lexend mb-1.5">7.1. Operator zastrzega sobie prawo do wprowadzania zmian w niniejszych Warunkach i
            Zasadach. Zmienione warunki będą publikowane na stronie internetowej Aplikacji i wchodzą w życie z dniem ich
            publikacji.</p>
        <p class="lexend-bold text-lg mt-5 mb-3">8. Postanowienia Końcowe</p>
        <p class="lexend mb-1.5">8.1. W sprawach nieuregulowanych niniejszymi Warunkami i Zasadami mają zastosowanie
            przepisy prawa polskiego.</p>
        <p class="lexend mb-1.5">8.2. Wszelkie spory wynikające z korzystania z Aplikacji będą rozstrzygane przez
            właściwe sądy powszechne.</p>
        <hr class="my-8">
        <p class="lexend mb-1.5">Niniejsza Polityka Prywatności obowiązuje od
            dnia <span class="text-gradient-primary lexend-bold">23.05.2024</span>.</p>
    </div>
</template>



<style scoped lang="scss">
ul {
    list-style: disc;
    padding-left: 20px;
    color: $text_secondary;
}

.body--dark ul {
    color: $text_secondary-dark;
}
</style>
