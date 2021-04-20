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

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const counter = {};
    authors.forEach(function(x) { counter[x] = (counter[x] || 0)+1; });
    
    const blogPerson = Object.keys(counter).reduce((a, b) => counter[a] > counter[b] ? a : b);
    const blogNumber = Object.values(counter).reduce((a, b) => counter[a] > counter[b] ? a : b);
    return {
        author: blogPerson,
        blogs: blogNumber
    }
}

const mostLikes = (blogs) => {
    const authors = {}
    blogs.forEach(blog => {
        if(blog.author in authors) {
            authors[blog.author] = authors[blog.author] + blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
    })
    const blogPerson = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);

    return {
        author: blogPerson,
        likes: authors[blogPerson]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
