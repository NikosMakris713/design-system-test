import MainLogo from '../../../assets/media/logos/logo-main.svg';

type Props = {};

const MediaScroller = (props: Props) => {
	return (
		<ul className='horizontal-media-scroller'>
			<li>
				<a href='#'>
					<figure>
						<picture>
							<img alt='A placeholder image' loading='lazy' src={MainLogo} />
						</picture>
						<figcaption>Legends</figcaption>
					</figure>
				</a>
			</li>
		</ul>
	);
};

export default MediaScroller;
