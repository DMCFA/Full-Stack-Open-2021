import React from 'react'
import { Link } from 'react-router-dom'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core'

const Blog = ({ blog }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle} className='blog'>
			<div>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	)
}

export default Blog