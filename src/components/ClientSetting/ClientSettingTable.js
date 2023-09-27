import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardFooter,
	Pagination,
	PaginationItem,
	PaginationLink,
	Table,
	Row,
	Button,
} from 'reactstrap';

const ClientSettingTable = ({
	data,
	addToggle,
	editToggle,
	deleteToggle,
	setEditData,
	setIndex,
}) => {
	const history = useHistory();

	return (
		<>
			<Row>
				<div className='col'>
					<Card className='shadow'>
						<CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
							<div className='d-flex align-items-center'>
								<Button
									size='sm'
									color='primary'
									onClick={() => {
										history.push('/admin/settings');
									}}
								>
									<i className='fas fa-arrow-left '></i>
								</Button>

								<h3 className=' pt-2 '>Client Setting</h3>
							</div>

							<Button color='primary' onClick={addToggle}>
								Add
							</Button>
						</CardHeader>

						<Table
							className='align-items-center table-flush'
							responsive
						>
							<thead className='thead-light'>
								<tr>
									<th scope='col'>Tip</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((el, id) => {
										return (
											<tr key={id}>
												<td> {el}</td>

												<td>
													<Button
														className='btn-sm'
														color='primary'
														onClick={() => {
															setIndex(id);
															setEditData(el);
															editToggle();
														}}
													>
														Edit
													</Button>
													<Button
														className='btn-sm'
														color='danger'
														onClick={() => {
															setEditData(el);
															deleteToggle();
														}}
													>
														Delete
													</Button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
						<CardFooter className='py-4'>
							<nav aria-label='...'>
								<Pagination
									className='pagination justify-content-end mb-0'
									listClassName='justify-content-end mb-0'
								>
									<PaginationItem className='disabled'>
										<PaginationLink
											href='#pablo'
											onClick={e => e.preventDefault()}
											tabIndex='-1'
										>
											<i className='fas fa-angle-left' />
											<span className='sr-only'>
												Previous
											</span>
										</PaginationLink>
									</PaginationItem>
									<PaginationItem className='active'>
										<PaginationLink
											href='#pablo'
											onClick={e => e.preventDefault()}
										>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											href='#pablo'
											onClick={e => e.preventDefault()}
										>
											2{' '}
											<span className='sr-only'>
												(current)
											</span>
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											href='#pablo'
											onClick={e => e.preventDefault()}
										>
											3
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											href='#pablo'
											onClick={e => e.preventDefault()}
										>
											<i className='fas fa-angle-right' />
											<span className='sr-only'>
												Next
											</span>
										</PaginationLink>
									</PaginationItem>
								</Pagination>
							</nav>
						</CardFooter>
					</Card>
				</div>
			</Row>
		</>
	);
};

export default ClientSettingTable;
