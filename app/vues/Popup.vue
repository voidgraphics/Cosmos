<template src="../html/popup.html">

</template>
<script lang="coffee">
    module.exports = Popup =

        data: ->
            id: null

        methods:
            confirmDelete: ->
                this.$dispatch "confirmDelete"

            hidePopup: ->
                this.$dispatch "hidePopup"

</script>
