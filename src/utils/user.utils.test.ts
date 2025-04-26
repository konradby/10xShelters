import { describe, it, expect } from 'vitest';
import { getInitialsFromEmail } from './user.utils';

describe('getInitialsFromEmail', () => {
  it('powinien zwrócić inicjały z maila w formacie imie.nazwisko@domena.pl', () => {
    expect(getInitialsFromEmail('jan.kowalski@example.com')).toBe('JK');
    expect(getInitialsFromEmail('anna.nowak@example.com')).toBe('AN');
    expect(getInitialsFromEmail('piotr.wisniewski@example.com')).toBe('PW');
    expect(getInitialsFromEmail('maria.zielinska@example.com')).toBe('MZ');
    expect(getInitialsFromEmail('adam.malysz@example.com')).toBe('AM');
  });

  it('powinien zwrócić inicjały z maila w formacie imie@domena.pl', () => {
    expect(getInitialsFromEmail('jan@example.com')).toBe('J');
    expect(getInitialsFromEmail('anna@example.com')).toBe('A');
    expect(getInitialsFromEmail('piotr@example.com')).toBe('P');
    expect(getInitialsFromEmail('maria@example.com')).toBe('M');
    expect(getInitialsFromEmail('adam@example.com')).toBe('A');
  });

  it('powinien obsłużyć maile z cyframi', () => {
    expect(getInitialsFromEmail('jan123@example.com')).toBe('J');
    expect(getInitialsFromEmail('123anna@example.com')).toBe('A');
    expect(getInitialsFromEmail('piotr456@example.com')).toBe('P');
    expect(getInitialsFromEmail('maria789@example.com')).toBe('M');
    expect(getInitialsFromEmail('adam012@example.com')).toBe('A');
  });

  it('powinien obsłużyć maile z podkreśleniami', () => {
    expect(getInitialsFromEmail('jan_kowalski@example.com')).toBe('JK');
    expect(getInitialsFromEmail('anna_nowak@example.com')).toBe('AN');
    expect(getInitialsFromEmail('piotr_wisniewski@example.com')).toBe('PW');
    expect(getInitialsFromEmail('maria_zielinska@example.com')).toBe('MZ');
    expect(getInitialsFromEmail('adam_malysz@example.com')).toBe('AM');
  });

  it('powinien obsłużyć maile z kropkami i podkreśleniami', () => {
    expect(getInitialsFromEmail('jan.kowalski_123@example.com')).toBe('JK');
    expect(getInitialsFromEmail('anna.nowak_456@example.com')).toBe('AN');
    expect(getInitialsFromEmail('piotr.wisniewski_789@example.com')).toBe('PW');
    expect(getInitialsFromEmail('maria.zielinska_012@example.com')).toBe('MZ');
    expect(getInitialsFromEmail('adam.malysz_345@example.com')).toBe('AM');
  });

  it('powinien obsłużyć maile z wieloma separatorami', () => {
    expect(getInitialsFromEmail('jan.kowalski.nowak@example.com')).toBe('JKN');
    expect(getInitialsFromEmail('anna.maria.nowak@example.com')).toBe('AMN');
    expect(getInitialsFromEmail('piotr.adam.wisniewski@example.com')).toBe(
      'PAW'
    );
    expect(getInitialsFromEmail('maria.anna.zielinska@example.com')).toBe(
      'MAZ'
    );
    expect(getInitialsFromEmail('adam.piotr.malysz@example.com')).toBe('APM');
  });

  it('powinien obsłużyć maile z wielkimi literami', () => {
    expect(getInitialsFromEmail('JAN.KOWALSKI@example.com')).toBe('JK');
    expect(getInitialsFromEmail('ANNA.NOWAK@example.com')).toBe('AN');
    expect(getInitialsFromEmail('PIOTR.WISNIEWSKI@example.com')).toBe('PW');
    expect(getInitialsFromEmail('MARIA.ZIELINSKA@example.com')).toBe('MZ');
    expect(getInitialsFromEmail('ADAM.MALYSZ@example.com')).toBe('AM');
  });

  it('powinien obsłużyć maile z mieszanymi separatorami', () => {
    expect(getInitialsFromEmail('jan_kowalski.nowak@example.com')).toBe('JKN');
    expect(getInitialsFromEmail('anna.maria_nowak@example.com')).toBe('AMN');
    expect(getInitialsFromEmail('piotr_adam.wisniewski@example.com')).toBe(
      'PAW'
    );
    expect(getInitialsFromEmail('maria.anna_zielinska@example.com')).toBe(
      'MAZ'
    );
    expect(getInitialsFromEmail('adam_piotr.malysz@example.com')).toBe('APM');
  });
});
