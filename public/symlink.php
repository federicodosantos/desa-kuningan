<?php
$target = $_SERVER['DOCUMENT_ROOT']."/../desa_kuningan/storage/app/public";
$link = $_SERVER['DOCUMENT_ROOT']."/storage";
if(symlink($target, $link)){
    echo "Symlink created successfully.";
} else {
    echo "Failed to create symlink.";
}

