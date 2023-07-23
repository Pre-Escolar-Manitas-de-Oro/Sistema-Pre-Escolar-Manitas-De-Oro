$(document).ready(function() {


    $(".delete-libro").on('click', function(e) {

        e.preventDefault();
        if (confirm("Estas seguro que deseas eliminar este libro?")) {

            $(this).closest("#form-delete").submit();

        }

    });

    $(".delete-editorial").on('click', function(e) {

        e.preventDefault();

        if (confirm("Estas seguro que deseas eliminar este editorial?")) {

            $(this).closest("#form-delete2").submit();

        }

    });

    $(".delete-autor").on('click', function(e) {

        e.preventDefault();

        if (confirm("Estas seguro que deseas eliminar este autor?")) {

            $(this).closest("#form-delete3").submit();

        }

    });
    $(".delete-categoria").on('click', function(e) {

        e.preventDefault();

        if (confirm("Estas seguro que deseas eliminar esta categoria?")) {

            $(this).closest("#form-delete5").submit();

        }

    });


});