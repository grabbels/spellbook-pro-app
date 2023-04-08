<script></script>

<div class="loader ">
	<div class="rotate"><i class="ri-loader-4-line" /></div>
</div>

<style lang="scss">
    .loader {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .rotate {
            animation: rotate 1s infinite cubic-bezier(.17,.67,.83,.67);
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            @keyframes rotate {
                to {transform: rotate(360deg);}
            }
            i {
                font-size: 3rem;
                color: var(--translucent);
            }
        }
    }
</style>
