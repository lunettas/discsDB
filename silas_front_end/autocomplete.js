//  TODO: set up autocomplete
$('.basicAutoComplete').autoComplete({
    resolverSettings: {
      url: function() {
        var fieldName = $(this).attr('name');
        return '/autocomplete-values/' + fieldName;
      },
      dataType: 'json',
      data: function(term, response) {
        return { q: term };
      },
      transformResult: function(response) {
        return {
          suggestions: $.map(response, function(value) {
            return { value: value };
          })
        };
      }
    }
  });