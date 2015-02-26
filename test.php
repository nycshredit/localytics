<?php
/*
include 'AES.php';

$inputText = "uSAi4awJLRvBAUyD1lZ0iG8AovZ/xtjURZzVZLlM3LA=";
$inputKey = "LOCALYTICSTRACK1";

echo "made it!";
$blockSize = 256;
$aes = new AES($inputText, $inputKey, $blockSize);
//$enc = $aes->encrypt();
$aes->setData($enc);
$dec=$aes->decrypt();
echo "still made it!";
//echo "After encryption: ".$enc."<br/>";
echo "After decryption: ".$dec."<br/>";
*/

// test 2

$Pass = "LOCALYTICSTRACK1";
$Clear = "mattrestivovip";        
//$Clear = "uSAi4awJLRvBAUyD1lZ0iG8AovZ/xtjURZzVZLlM3LA=";

$crypted = fnEncrypt($Clear, $Pass);
echo "Encrypred: ".$crypted."</br>";

$newClear = fnDecrypt($crypted, $Pass);
echo "Decrypred: ".$newClear."</br>";        

function fnEncrypt($sValue, $sSecretKey)
{
    return rtrim(
        base64_encode(
            mcrypt_encrypt(
                MCRYPT_RIJNDAEL_256,
                $sSecretKey, $sValue, 
                MCRYPT_MODE_ECB, 
                mcrypt_create_iv(
                    mcrypt_get_iv_size(
                        MCRYPT_RIJNDAEL_256, 
                        MCRYPT_MODE_ECB
                    ), 
                    MCRYPT_RAND)
                )
            ), "\0"
        );
}

function fnDecrypt($sValue, $sSecretKey)
{
    return rtrim(
        mcrypt_decrypt(
            MCRYPT_RIJNDAEL_256, 
            $sSecretKey, 
            base64_decode($sValue), 
            MCRYPT_MODE_ECB,
            mcrypt_create_iv(
                mcrypt_get_iv_size(
                    MCRYPT_RIJNDAEL_256,
                    MCRYPT_MODE_ECB
                ), 
                MCRYPT_RAND
            )
        ), "\0"
    );
}

	
?>