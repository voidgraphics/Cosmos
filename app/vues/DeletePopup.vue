<template src="../html/deletepopup.html">

</template>
<script lang="coffee">
    module.exports = DeletePopup =

        methods:
            confirmDelete: ->
                this.$dispatch "confirmDelete"

            hidePopup: ->
                this.$dispatch "hideDeletePopup"

</script>
