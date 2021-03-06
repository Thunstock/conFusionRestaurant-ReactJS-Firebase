import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
	Jumbotron,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false,
			isModalOpen: false
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleLogin(event) {
		this.toggleModal();
		this.props.loginUser({ username: this.username.value, password: this.password.value });
		event.preventDefault();
	}

	handleGoogleLogin(event) {
		this.toggleModal();
		this.props.googleLogin();
		event.preventDefault();
	}

	handleLogout() {
		this.props.logoutUser();
	}

	render() {
		return (
			<React.Fragment>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto" href="/">
							<img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg" /> Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/aboutus">
										<span className="fa fa-info fa-lg" /> About Us
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/menu">
										<span className="fa fa-list fa-lg" /> Menu
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/favorites">
										<span className="fa fa-heart fa-lg" /> My Favorites
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/contactus">
										<span className="fa fa-address-card fa-lg" /> Contact Us
									</NavLink>
								</NavItem>
							</Nav>
							<Nav className="ml-auto" navbar>
								<NavItem>
									{!this.props.auth.isAuthenticated ? (
										<Button outline onClick={this.toggleModal}>
											<span className="fa fa-sign-in fa-lg" /> Login
											{this.props.auth.isFetching ? (
												<span className="fa fa-spinner fa-pulse fa-fw" />
											) : null}
										</Button>
									) : (
										<div>
											<div className="navbar-text mr-3">{this.props.auth.user.displayName}</div>
											<Button outline onClick={this.handleLogout}>
												<span className="fa fa-sign-out fa-lg" /> Logout
												{this.props.auth.isFetching ? (
													<span className="fa fa-spinner fa-pulse fa-fw" />
												) : null}
											</Button>
										</div>
									)}
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				{/* <Jumbotron> */}
				<div style={bannerImg}>
					<div className="container-fluid">
						<div className="row row-header">
							<div className="col-12 col-sm-6">
								<h1>Ristorante Con Fusion</h1>
								<p>
									We take inspiration from the World's best cuisines, and create a unique fusion
									experience. Our lipsmacking creation will tickle your culinary senses!
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* </Jumbotron> */}
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label htmlFor="username">Email</Label>
								<Input
									type="text"
									id="username"
									name="username"
									innerRef={(input) => (this.username = input)}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									id="password"
									name="password"
									innerRef={(input) => (this.password = input)}
								/>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input
										type="checkbox"
										name="remember"
										innerRef={(input) => (this.remember = input)}
									/>
									Remember me
								</Label>
							</FormGroup>
							<Button type="submit" value="submit" color="primary">
								Login
							</Button>
						</Form>
						<p />
						<Button color="danger" onClick={this.handleGoogleLogin}>
							<span className="fa fa-google fa-lg" /> Login with Google
						</Button>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

const bannerImg = {
	backgroundSize: '100%',
	backgroundImage: 'url(assets/images/Banner.png)',
	height: '30rem',
	color: 'azure',
	paddingTop: '1rem'
};

export default Header;
