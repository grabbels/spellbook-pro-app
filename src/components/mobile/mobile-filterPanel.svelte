<script>
	import { filterPanelOpen } from '../../stores';
</script>

<div class:open={$filterPanelOpen} class="ui_mobile_filter_panel">
    <button class="close" on:click|stopPropagation={()=>$filterPanelOpen = false}>
        <i class="ri-close-line"></i>
    </button>
</div>

<style lang="scss">
    .ui_mobile_filter_panel {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        height: 500px;
        background-color: var(--panelbg);
        bottom: 0;
        z-index: 9999;
        border-radius: 18px 18px 0 0;
        box-shadow: 0 3px 20px rgba(0, 0, 0, 0.5);
        transition: .4s;
        transform: translateY(100%);
        pointer-events: auto;
        &.open {
            transform: translateY(0);
        }
        button.close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            i {
                font-size: 1.8rem;
                color: var(--lesstranslucent);
            }
        }
    }
</style>
