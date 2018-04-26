import { NativeDateAdapter } from "@angular/material";

export class MyDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        const day = date.getDate();
        const month = date.toLocaleString("fr-FR", { month: "long" });
        const year = date.getFullYear();
        
        
        if (displayFormat === 'input') {    
            return `${month}-${year}`;    
        } else {
            return `${day}-${month}-${year}`;
        }
    }
}