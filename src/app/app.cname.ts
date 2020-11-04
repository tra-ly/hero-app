import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'cname'
})
export class CnamePipe implements PipeTransform {
    transform(val: string) : string {
        const arrstr = [...val.toLowerCase()]
        
        for(let [i, temp] of arrstr.entries()){
           if(temp==' '){
            arrstr[i+1] = arrstr[i+1].toUpperCase()
           }
        }
        arrstr[0] = arrstr[0].toUpperCase()
        
        return arrstr.join('')
    }
}