function findAccountById(accounts, id) {
    for (let name in accounts) {
        const person = accounts[name];
        if (person.id == id) {
            return person;
        }
    }
    return null;
}

function sortAccountsByLastName(accounts) {
    let result = accounts.sort((accountA, accountB) =>
        accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
    );

    return result;
}

function getTotalNumberOfBorrows(account, books) {
    let count = 0;
    if (!account || !books) { return count; }

    for (let entry in books) {
        book = books[entry];
        if (book.borrows.find((item) => item.id === account.id)) {
            count++;
        }
    }
    return count;
}

function getBooksPossessedByAccount(account, books, authors) {
    let result = [];
    for (let entry in books) {
        book = books[entry];
        const authorId = book.authorId;
        const borrows = book.borrows;
        let expandedEntry;
        for (let n = 0; n < borrows.length; n++) {
            if (borrows[n].id === account.id && !borrows[n].returned) {
                for (let i = 0; i < authors.length; i++) {
                    if (authorId === authors[i].id) {
                        expandedEntry = expandAuthorInfoInBook(book, authors[i]);
                        result.push(expandedEntry);
                    }
                }
            }
        }
    }
    return result;
}

//This function basically exists to meet assignment parameters. I can't think of a reason Author needs to go before the borrows array but here we are.
function expandAuthorInfoInBook(book, author) {
    const tempBook = book;
    tempBook.author = author;
    const keys = Object.keys(tempBook);
    let result = {};

    const temp = keys[4];
    keys[4] = keys[5];
    keys[5] = temp;

    for (let i = 0; i < keys.length; i++) {
        if (tempBook.hasOwnProperty(keys[i])) {
            result[keys[i]] = tempBook[keys[i]];
        }
    }
    return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
  expandAuthorInfoInBook,
};
