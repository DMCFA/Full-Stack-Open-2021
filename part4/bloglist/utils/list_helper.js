const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, curr) => {
        return sum + curr.likes
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    const likes = blogs.reduce((biggest, curr) => {
        return biggest.likes > curr.likes
        ? biggest
        : curr
    }, 0)
    return {
        title: likes.title,
        author: likes.author,
        likes: likes.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
