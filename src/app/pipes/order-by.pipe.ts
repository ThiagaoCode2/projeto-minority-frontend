import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform 
{

  transform( array: any[], key: string, reverse: boolean = false ): any[] 
  {
    if( !array || !key )  
    {
      return array;
    }

    const sortedArray = array.sort( ( a, b ) => 
    {
      if( a[key] < b[key] )
      {
        return -1;
      }

      if( a[key] > b[key] ) 
      {
        return 1;
      }
      
      return 0;
    });

    return reverse ? sortedArray.reverse( ) : sortedArray;
  }

}
