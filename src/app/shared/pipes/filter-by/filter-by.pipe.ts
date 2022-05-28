import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

	/**
	 * Remove HTML
	 * @description Remove the HTML of a string.
	 */
	private removeHTML = (textHtml: string): string => {
		const tmp = document.createElement("DIV");
		tmp.innerHTML = textHtml;
		return tmp.textContent || tmp.innerText || textHtml;
	}

	transform(list: any[], filter: string): any[] {
		if (!filter || filter?.length < 3) return list;
  
		return list.filter((item) => {
			/**
			 * This code would work great if we wre filtering pain text:
			 * return JSON.stringify(item).toLowerCase().includes(filter.toLowerCase());
			 * 
			 * But considering we are filtering text containing HTML tags, we need to do an extra step
			 * and remove the HTML tags before filtering.
			 */

			// Remove HTML tags and compaire
			return this.removeHTML(JSON.stringify(item).toLowerCase()).includes(filter.toLowerCase());
		});
	}

}
