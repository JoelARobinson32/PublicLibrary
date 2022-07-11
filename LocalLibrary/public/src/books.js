function findAuthorById(authors, id) {
    return findById(authors, id);
}

function findBookById(books, id) {
    return findById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
    let result = [[], []];
    for (let entry in books) {
        const book = books[entry];
        const borrows = book.borrows;
        if (!borrows[0].returned) {
            result[0].push(book);
        } else {
            result[1].push(book);
        }
    }
    return result;
}

function getBorrowersForBook(book, accounts) {
    const borrows = book.borrows;
    let result = accounts.filter((account) =>
        borrows.find((person) =>
            person.id === account.id));
    for (let entry in result) {
        account = result[entry];
        if (!borrows[0].returned) {
            account.returned = false;
        } else {
            account.returned = true;
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (i >= 10) {
            result.pop();
        }
    }
    return result;
}

function findById(objects, id) {
    for (let item in objects) {
        const obj = objects[item];
        if (obj.id === id) {
            return obj;
        }
    }
    return null;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  findById,
};
