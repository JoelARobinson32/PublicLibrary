function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let count = 0;
    for (let entry in books) {
        const book = books[entry];
        if (!book.borrows[0].returned) {
            count++;
        }
    }
    return count;
}

function getMostCommonGenres(books) {
    let genres = [];
    for (let entry in books) {
        const book = books[entry];
        const genre = book.genre;
        let temp = {
            "name": genre,
            "count": 1
        };
        if (genres.length === 0 || !genres.find((type) => type.name.toLowerCase() === genre.toLowerCase())) {
            genres.push(temp);
        } else {
            for (let i = 0; i < genres.length; i++) {
                if (genres[i].name.toLowerCase() === temp.name.toLowerCase()) {
                    genres[i].count++;
                }
            }
        }
    }

    genres.sort((genreA, genreB) => genreB.count - genreA.count);
    return limitEntries(genres, 5);
}

function getMostPopularBooks(books) {
    let result = [];
    for (let i = 0; i < books.length; i++) {
        let temp = {
            "name": books[i].title,
            "count": books[i].borrows.length
        };
        result.push(temp);
    }

    result.sort((bookA, bookB) => bookB.count - bookA.count);
    return limitEntries(result, 5);
}

function getMostPopularAuthors(books, authors) {
    let result = [];
    for (let entry in authors) {
        const author = authors[entry];
        const name = `${author.name.first} ${author.name.last}`;
        const id = author.id;
        let temp = {
            "name": name,
            "count": 0
        };
        for (let i = 0; i < books.length; i++) {
            if (books[i].authorId === id) {
                if (result.length === 0 || !result.find((writer) => writer.name.toLowerCase() === name.toLowerCase())) {
                    temp.count += books[i].borrows.length;
                    result.push(temp);
                } else {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].name.toLowerCase() === temp.name.toLowerCase()) {
                            result[i].count += books[i].borrows.length;
                        }
                    }
                }
            }
        }
    }
    result.sort((authorA, authorB) => authorB.count - authorA.count);
    return limitEntries(result, 5);
}

function limitEntries(array, limit) {
    while (array.length > limit) {
        array.pop();
    }
    return array;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  limitEntries,
};
