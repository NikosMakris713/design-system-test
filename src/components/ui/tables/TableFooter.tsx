import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '../../../assets/media/icons/ArrowForwardIcon';
import ArrowBackIcon from '../../../assets/media/icons/ArrowBackIcon';

type Props = {
	count: number;
	rowsPerPage: number;
	pageTitle: string;
	pages: number;
};

const calculateVisibleRange = (currentPage: number, pages: number): [number, number] => {
	const lastPage = Math.min(currentPage + 1, pages);
	const firstPage = Math.max(lastPage - 2, 1);
	return [firstPage, lastPage];
};

const TableFooter = (props: Props) => {
	const navigate = useNavigate();
	const { pageNumber }: any = useParams();
	const currentPage = Number(pageNumber);
	const [visibleRange, setVisibleRange] = useState<[number, number]>([1, 5]);

	useEffect(() => {
		if (!pageNumber) {
			navigate(`/${props.pageTitle}/page/${1}`);
		}

		setVisibleRange(calculateVisibleRange(currentPage, props.pages));
	}, [pageNumber, props.pageTitle, navigate, props.pages, currentPage]);

	return (
		<nav className='pagination'>
			<NavLink
				className='page-previous'
				to={`/${props.pageTitle}/page/${currentPage - 1}`}>
				<ArrowBackIcon />
				Previous
			</NavLink>
			<ol className='pages-list'>
				{currentPage > 2 && (
					<>
						<li>
							<NavLink
								key='page-1'
								title='Go to page 1'
								to={`/${props.pageTitle}/page/1`}>
								1
							</NavLink>
						</li>

						{currentPage > 3 && (
							<li>
								<NavLink
									className='disabled'
									key='ellipsis-start'
									to={'/disabled'}>
									...
								</NavLink>
							</li>
						)}
					</>
				)}

				{Array.from({ length: props.pages }, (_, i: number) => {
					const pageNumber = i + 1;
					if (pageNumber >= visibleRange[0] && pageNumber <= visibleRange[1]) {
						return (
							<li key={`page-${pageNumber}`}>
								<NavLink
									className={currentPage === pageNumber ? 'active' : ''}
									to={`/${props.pageTitle}/page/${pageNumber}`}
									title={`Go to page ${String(pageNumber)}`}>
									{String(pageNumber)}
								</NavLink>
							</li>
						);
					}
					return null;
				})}

				{currentPage < props.pages - 1 && (
					<>
						{currentPage < props.pages - 2 && (
							<li key='ellipsis-end'>
								<NavLink
									className='disabled'
									title='...'
									to={'/disabled'}>
									...
								</NavLink>
							</li>
						)}

						<li key={`page-${props.pages}`}>
							<NavLink
								to={`/${props.pageTitle}/page/${props.pages}`}
								title={`Go to page ${String(props.pages)}`}>
								{String(props.pages)}
							</NavLink>
						</li>
					</>
				)}
			</ol>
			<NavLink
				className='next-page'
				to={`/${props.pageTitle}/page/${currentPage + 1}`}>
				Next
				<ArrowForwardIcon />
			</NavLink>
		</nav>
	);
};

export default TableFooter;
