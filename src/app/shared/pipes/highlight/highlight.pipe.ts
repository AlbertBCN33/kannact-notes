import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

	transform(list: any[], filter: string, key?: string[]): any[] {
		if (!filter || filter?.length < 3) return list;
		
		const regexp = new RegExp(filter, 'igm');

		return list.map((item) => {
			if (!key && JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())) {
				// No oject key specified -> search for any match
				item = JSON.parse(JSON.stringify(item).replace(regexp, '<span class=\'highlighted\'>$&</span>'));
			} else if (key) {
				// Object key specified -> search for a match in the key:value
				const newItem = JSON.parse(JSON.stringify(item));
				for (let index = 0; index < key.length; index++) {
					if (item[key[index]]?.toLowerCase().includes(filter.toLowerCase())) {
						newItem[key[index]] = newItem[key[index]].replace(regexp, '<span class=\'highlighted\'>$&</span>');
					}
				}
				item = newItem;
			}
			return item;
		});
	}

}
