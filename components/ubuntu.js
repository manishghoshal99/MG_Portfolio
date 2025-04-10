import React, { Component } from 'react';
import BootingScreen from './screen/booting_screen';
import Desktop from './screen/desktop';
import LockScreen from './screen/lock_screen';
import Navbar from './screen/navbar';
import ReactGA from 'react-ga4';

export default class Ubuntu extends Component {
	constructor() {
		super();
		this.state = {
			screen_locked: false,
			bg_image_name: 'wall-2',
			booting_screen: true,
			shutDownScreen: false,
			mounted: false
		};
	}

	componentDidMount() {
		// Set mounted state to true
		this.setState({ mounted: true }, () => {
			this.getLocalData();
		});
	}

	setTimeOutBootScreen = () => {
		if (!this.state.mounted) return;
		setTimeout(() => {
			this.setState({ booting_screen: false });
		}, 2000);
	};

	getLocalData = () => {
		if (!this.state.mounted) return;

		try {
			// Get Previously selected Background Image
			let bg_image_name = localStorage.getItem('bg-image');
			if (bg_image_name) {
				this.setState({ bg_image_name });
			}

			let booting_screen = localStorage.getItem('booting_screen');
			if (booting_screen) {
				// user has visited site before
				this.setState({ booting_screen: false });
			} else {
				// user is visiting site for the first time
				localStorage.setItem('booting_screen', false);
				this.setTimeOutBootScreen();
			}

			// get shutdown state
			let shut_down = localStorage.getItem('shut-down');
			if (shut_down === 'true') {
				this.setState({ shutDownScreen: true });
			} else {
				// Get previous lock screen state
				let screen_locked = localStorage.getItem('screen-locked');
				if (screen_locked) {
					this.setState({ screen_locked: screen_locked === 'true' });
				}
			}
		} catch (error) {
			console.error('Error accessing localStorage:', error);
		}
	};

	lockScreen = () => {
		if (!this.state.mounted) return;
		
		// google analytics
		ReactGA.send({ hitType: "pageview", page: "/lock-screen", title: "Lock Screen" });
		ReactGA.event({
			category: `Screen Change`,
			action: `Set Screen to Locked`
		});

		const statusBar = document.getElementById('status-bar');
		if (statusBar) statusBar.blur();
		
		setTimeout(() => {
			this.setState({ screen_locked: true });
		}, 100); // waiting for all windows to close (transition-duration)
		localStorage.setItem('screen-locked', true);
	};

	unLockScreen = () => {
		if (!this.state.mounted) return;

		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		window.removeEventListener('click', this.unLockScreen);
		window.removeEventListener('keypress', this.unLockScreen);

		this.setState({ screen_locked: false });
		localStorage.setItem('screen-locked', false);
	};

	changeBackgroundImage = (img_name) => {
		if (!this.state.mounted) return;

		this.setState({ bg_image_name: img_name });
		localStorage.setItem('bg-image', img_name);
	};

	shutDown = () => {
		if (!this.state.mounted) return;

		ReactGA.send({ hitType: "pageview", page: "/switch-off", title: "Custom Title" });
		ReactGA.event({
			category: `Screen Change`,
			action: `Switched off the Ubuntu`
		});

		const statusBar = document.getElementById('status-bar');
		if (statusBar) statusBar.blur();
		
		this.setState({ shutDownScreen: true });
		localStorage.setItem('shut-down', true);
	};

	turnOn = () => {
		if (!this.state.mounted) return;

		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		this.setState({ shutDownScreen: false, booting_screen: true });
		this.setTimeOutBootScreen();
		localStorage.setItem('shut-down', false);
	};

	render() {
		const { mounted } = this.state;
		
		if (!mounted) {
			return (
				<div className="w-screen h-screen overflow-hidden" id="monitor-screen">
					<div className="loading">Loading...</div>
				</div>
			);
		}

		return (
			<div className="w-screen h-screen overflow-hidden" id="monitor-screen">
				<LockScreen
					isLocked={this.state.screen_locked}
					bgImgName={this.state.bg_image_name}
					unLockScreen={this.unLockScreen}
				/>
				<BootingScreen
					visible={this.state.booting_screen}
					isShutDown={this.state.shutDownScreen}
					turnOn={this.turnOn}
				/>
				<Navbar lockScreen={this.lockScreen} shutDown={this.shutDown} />
				<Desktop bg_image_name={this.state.bg_image_name} changeBackgroundImage={this.changeBackgroundImage} />
			</div>
		);
	}
}
