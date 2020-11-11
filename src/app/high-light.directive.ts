import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @Input('appHighLight') valueSearch: string;


  constructor(
    private Element: ElementRef
  ) {}

  ngOnInit(){
    this.boldText();
  }
  
  private boldText(){
    let arr = this.valueSearch.split(',', 2);
    arr[0] = arr[0].toLowerCase();
    let term = [...arr[0]];
    let tagHTML;
    
    if(arr[1].includes(term[0].toUpperCase())) {
      arr[0] = arr[0].replace(term[0], term[0].toUpperCase());
    }
    tagHTML = arr[1].replace(arr[0], '<b>' + arr[0] + '</b>');
    this.Element.nativeElement.innerHTML = tagHTML;

  }
}
