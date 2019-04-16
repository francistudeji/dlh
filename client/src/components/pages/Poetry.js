import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'
import axios from 'axios'
import format from 'date-fns/format'

function Modal({ currentPoetry }) {
	return (
		<div
			class="modal fade"
			id="exampleModalCenter"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle">
							Poetry
						</h5>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<h3 className="text-center">{currentPoetry.poetryTitle}</h3>
						<h5 className="text-center">{currentPoetry.poetrySubtitle}</h5>
						<div>{currentPoetry.poetryFindings}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

class Poetry extends Component {
	constructor(props) {
		super(props)
		this.state = {
			poetries: [],
			currentPoetry: null,
			loading: true
		}
	}

	getPoetries = () => {
		axios({
			url: '/api/poetries',
			method: 'get'
		})
			.then(res => {
				this.setState(
					{ poetries: [...this.state.poetries, ...res.data.poetries] },
					() => {
						console.log(this.state)
					}
				)
			})
			.catch(err => console.log({ err }))
	}

	componentDidMount() {
		this.getPoetries()
	}

	render() {
		return (
			<Layout>
				{this.state.currentPoetry !== null && (
					<Modal currentPoetry={this.state.currentPoetry} />
				)}
				<div className="row">
					<div className="col-12">
						<h3 className="text-center mb-4">Poetry</h3>
					</div>
					{this.state.poetries.length > 0 ? (
						this.state.poetries.map(poetry => (
							<div
								className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
								key={poetry._id}
							>
								<div className="card mb-3 ">
									<div className="card-body">
										<Link
											to={`/poetry/${poetry._id}`}
											className="text-dark"
											style={{ textDecoration: 'none' }}
										>
											<h5 className="card-title mb-3">{poetry.poetryTitle}</h5>
										</Link>
										<h6 className="card-subtitle mb-3 text-muted">
											{poetry.poetrySubtitle} on{' '}
											{format(poetry.createdAt, 'Do MMMM YYYY')}
										</h6>
										{/* <p className="card-text mb-4">
                      {String(description).substr(0, 100) + "..."}
                    </p> */}
										<br />
										<button
											style={{
												position: 'absolute',
												left: '15px',
												bottom: '15px'
											}}
											className="card-link btn btn-outline-danger"
											data-toggle="modal"
											data-target="#exampleModalCenter"
											onClick={e => {
												this.setState({ currentPoetry: poetry })
											}}
										>
											Read More
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="h1 lead text-center mx-auto">Loading...</p>
					)}
				</div>
			</Layout>
		)
	}
}

export default Poetry
