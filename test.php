<?php

/*
include 'AES.php';

$inputText = "uSAi4awJLRvBAUyD1lZ0iG8AovZ/xtjURZzVZLlM3LA=";
$inputKey = "LOCALYTICSTRACK1";

$blockSize = 256;
$aes = new AES($inputText, $inputKey, $blockSize);
$enc = $aes->encrypt();
$aes->setData($enc);
$dec=$aes->decrypt();
echo "still made it!";
echo "After encryption: ".$enc."<br/>";
echo "<<<<< does this match? >>>>>>>>"
echo "<br/>".$inputTextEnc."<br/>"
echo "After decryption: ".$dec."<br/>";
*/

// test 3
/*
include 'AES.php';

$inputTextEnc = "IG87EISz9fsKFnQYQrni+A==";
$inputText = "mcconnella1979";
$inputKey = "LOCALYTICSTRACK1";

$blockSize = 128;
$aes = new AES($inputText, $inputKey, $blockSize);
$enc = $aes->encrypt();
$aes->setData($enc);
$aes->setData($inputText);
$dec=$aes->decrypt();

echo "After encryption: ".$enc." >>> does this match? <<< ".$inputTextEnc."<br/>";

echo "After decryption: ".$dec."<br/>";
*/


// test 2

$Pass = "LOCALYTICSTRACK1";

$Clear = "mcconnella1979";
$ClearEnc = "IG87EISz9fsKFnQYQrni+A==";

$crypted = "IG87EISz9fsKFnQYQrni+A==";
//$crpyted = "uSAi4awJLRvBAUyD1lZ0iG8AovZ/xtjURZzVZLlM3LA="; // mattrestivovip this doesn't work

$crypted = fnEncrypt($Clear, $Pass);
echo "Encrypred: ".$crypted." >>>>>>>?????<<<<<<<< ".$ClearEnc."</br>";

$newClear = fnDecrypt($crypted, $Pass);
echo "Decrypred: ".$newClear."</br>";        

function fnEncrypt($sValue, $sSecretKey)
{
    return rtrim(
        base64_encode(
            mcrypt_encrypt(
                //MCRYPT_RIJNDAEL_256,
                MCRYPT_RIJNDAEL_128,
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
            //MCRYPT_RIJNDAEL_256, 
			MCRYPT_RIJNDAEL_128,
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