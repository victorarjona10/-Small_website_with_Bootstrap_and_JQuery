$(function() {
    // Cuando el usuario haga clic en el botón
    $('#Boton').click(function() {
        // Obtener el valor del input con id "cuenta"
        var valor = $('#cuenta').val();

        // Mostrar el valor recogido en el párrafo con id "resultado"
        $('#resultado').text("El valor introducido es: " + valor);
        
        var direccion = "https://api.github.com/users/" + valor + "/repos";
        $('#resultado2').text("Consultando API en: " + direccion);

        // Realizar la solicitud AJAX a la API de GitHub
        $.ajax({
            url: direccion,
            method: "GET",
            success: function(repos) {
                // Limpiar la tabla de repositorios anterior
                $('#reposBody').empty();

                // Verificar si hay repositorios
                if (repos.length === 0) {
                    $('#reposBody').append('<tr><td colspan="2">No se encontraron repositorios para este usuario.</td></tr>');
                } else {
                    // Iterar sobre los repositorios y mostrarlos en la tabla
                    $.each(repos, function(index, repo) {
                        var descripcion = repo.description ? repo.description : "Sin descripción";
                        var estrellas = repo.stargazers_count ? repo.stargazers_count : "0";
                        var repoRow = `
                            <tr>
                                <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
                                <td>${descripcion}</td>
                                <td>${estrellas}</td>
                            </tr>
                        `;
                        $('#reposBody').append(repoRow);
                    });
                }
            },
            error: function() {
                $('#reposBody').empty();
                $('#reposBody').append('<tr><td colspan="2">Error al obtener los repositorios. Verifica el nombre de usuario.</td></tr>');
            }
        });
    });
});
