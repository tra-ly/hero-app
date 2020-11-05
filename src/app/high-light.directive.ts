import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @Input('appHighLight') valueSearch: string


  constructor(
    private Element: ElementRef
  ) {}

  ngOnInit(){
    this.boldText()
  }
  
  private boldText(){
    const arr = this.valueSearch.split(',', 2)
    const term = arr[1].replace(arr[0],'<b>' + arr[0] + '</b>')
    this.Element.nativeElement.innerHTML = term
  }
}
