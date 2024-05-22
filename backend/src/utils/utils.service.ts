
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    private readonly countries = [
        { id: '1', pl: "Polska", en: "Poland" },
        { id: '2', pl: "Niemcy", en: "Germany" },
        { id: '3', pl: "Francja", en: "France" },
    ];

    private readonly conversionMap = {
        "1": {
            "2": 1000,
            "3": 1000000
        },
        "2": {
            "1": 0.001,
            "3": 1000
        },
        "3": {
            "1": 0.000001,
            "2": 0.001
        },
        "4":{
            
        }
    };

    private readonly units = [
        { id: '1', pl: "tony", en: "tons" },
        { id: '2', pl: "kilogramy", en: "kilograms" },
        { id: '3', pl: "gramy", en: "grams" },
        { id: '4', pl: "litry", en: "liters"}
    ];

    findRegions(lang: string): any {
        return this.countries.map(country => ({
            id: country.id,
            name: country[lang] || country.en
        }));
    }

    findUnits(lang: string): any {
        const units = this.units.map(unit => ({
            id: unit.id,
            name: unit[lang] || unit.en
        }));
        return {conversionMap: this.conversionMap, units}
    }
}