type Props = {
	requestResponseStatus: string;
};

const FailedHttpRequestStatus = (props: Props) => {
	return (
		<div className='container-large'>
			<h2>{props.requestResponseStatus}</h2>
		</div>
	);
};

export default FailedHttpRequestStatus;
