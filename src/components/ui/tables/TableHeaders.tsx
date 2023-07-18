import type Headers from '../../../types/react-ui-elements/table-headers';
import IconButton from '../buttons/icon-button/IconButton';
import { useState } from 'react';
import ArrowUpIcon from '../../../assets/media/icons/ArrowUpIcon';
import ArrowDownIcon from '../../../assets/media/icons/ArrowDownIcon';

interface Props {
	headers: Headers[];
	isSortable: boolean;
	initialSorting: `${boolean} - ${string}`;
	sortFunction: (header: any, isAscending: any) => void;
}

const TableHeaders = (props: Props) => {
	const [lastClickedButton, setLastClickedButton] = useState<`${boolean} - ${string}`>(
		props.initialSorting
	);

	const handleSort = (header: Headers, isAscending: boolean) => {
		props.sortFunction(header.databaseTitle, isAscending);
		setLastClickedButton(`${isAscending} - ${header.databaseTitle}`);
	};

	return (
		<thead>
			<tr>
				{props.headers.map((header) => (
					<th key={header.databaseTitle}>
						{header.displayTitle === '' ? null : (
							<>
								{header.displayTitle}
								{props.isSortable === true ? (
									<div className='sorting-buttons'>
										<IconButton
											className={
												lastClickedButton ===
												`${true} - ${header.databaseTitle}`
													? 'active'
													: ''
											}
											type='button'
											onClick={() => {
												handleSort(header, true);
											}}
											title={`Sort the movies table by ascending ${header.displayTitle.toLowerCase()} order`}
											disabled={false}
											ariaLive='assertive'
											icon={<ArrowUpIcon />}
										/>
										<IconButton
											type='button'
											onClick={() => handleSort(header, false)}
											className={
												lastClickedButton ===
												`${false} - ${header.databaseTitle}`
													? 'active'
													: ''
											}
											title={`Sort the movies table by descending ${header.displayTitle.toLowerCase()} order`}
											disabled={false}
											ariaLive='assertive'
											icon={<ArrowDownIcon />}
										/>
									</div>
								) : null}
							</>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeaders;
