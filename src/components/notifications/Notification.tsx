import CheckIcon from '../../assets/media/icons/CheckIcon';
import { useEffect, useRef } from 'react';
import useGetLatestRequestResult from '../../hooks/use-get-latest-request-result';
type Props = {};

const Notification = (props: Props) => {
	const { latestRequestResult } = useGetLatestRequestResult();
	const notificationModalRef: any = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (notificationModalRef.current && latestRequestResult) {
			notificationModalRef.current.showModal();
		}
	}, [latestRequestResult]);

	const closeModals = () => {
		// sendMovieModal.close();
		notificationModalRef.current.close();
	};

	return (
		<dialog
			id='notification-modal'
			className={`${latestRequestResult === true ? 'good' : latestRequestResult === false ? 'bad' : ''}`}
			ref={notificationModalRef}>
			<div id='notification-message'>
				<CheckIcon />
				<h3>
					{latestRequestResult === true
						? 'Started from the bottom now we here, started from the bottom now we here'
						: 'Neinnnn'}
				</h3>
			</div>
			<div className='notification-actions'>
				<button>Undo</button>
				<button onClick={closeModals}>Ok</button>
			</div>
		</dialog>
	);
};

export default Notification;
