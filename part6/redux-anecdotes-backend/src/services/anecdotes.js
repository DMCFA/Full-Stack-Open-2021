import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVotes = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
	return request.data
}

export default { getAll, createAnecdote, updateVotes }