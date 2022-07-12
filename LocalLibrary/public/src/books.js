function findAuthorById(authors, id) {
    return findById(authors, id);
}

function findBookById(books, id) {
    return findById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
    let result = [[], []];
    result[0] = books.filter((book) => !book.borrows[0].returned);
    result[1] = books.filter((book) => book.borrows[0].returned);
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

    return limitEntries(result, 10);
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

function limitEntries(array, limit) {
    while (array.length > limit) {
        array.pop();
    }
    return array;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  findById,
  limitEntries,
};
