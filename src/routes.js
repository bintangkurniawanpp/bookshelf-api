const { addBookHandler, getAllBooksHandler } = require('./handler');

const routes = [
    {
        // menyimpan buku
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        // menampilkan seluruh buku
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    // {
    //     // menampilkan detail buku
    //     method: 'GET',
    //     path: '/books/{bookId}',
    //     handler: ''
    // },
    // {
    //     // mengubah data buku
    //     method: 'PUT',
    //     path: '//books/{bookId}',
    //     handler: ''
    // },
    // {
    //     // menghapus buku
    //     method: 'DELETE',
    //     path: '//books/{bookId}',
    //     handler: ''
    // }
];

module.exports = routes;