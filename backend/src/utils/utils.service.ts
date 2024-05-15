
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    private readonly countries = [
        { id: '1', pl: "Polska", en: "Poland" },
        { id: '2', pl: "Niemcy", en: "Germany" },
        { id: '3', pl: "Francja", en: "France" },
    ];

    private readonly units = [
        { id: '1', pl: "litry", en: "litters" },
        { id: '2', pl: "tony", en: "tonnes" },
    ];

    findRegions(lang: string): any {
        return this.countries.map(country => ({
            id: country.id,
            name: country[lang] || country.en
        }));
    }

    findUnits(lang: string): any {
        return this.units.map(unit => ({
            id: unit.id,
            name: unit[lang] || unit.en
        }));
    }
}