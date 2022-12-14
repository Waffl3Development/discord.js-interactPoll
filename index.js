const DiscordJS = require("discord.js");
const alphabet = ['š¦', 'š§', 'šØ', 'š©', 'šŖ', 'š«', 'š¬', 'š­', 'š®', 'šÆ', 'š°', 'š±',
            'š²', 'š³', 'š“', 'šµ', 'š¶', 'š·', 'šø', 'š¹', 'šŗ', 'š»', 'š¼', 'š½', 'š¾', 'šæ'];       
async function poll(interaction, array, embedColor) {
    //const findSep = array.find(char => char.includes(separator));
    const mainArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === null){
            break;
        }    
        mainArray.push(array[i]);
    }
    //console.log(mainArray);
    //console.log(mainArray.length); // ===3
    
    if (mainArray.length === 3) {
        const question = mainArray[0];
        if (!question) {
            return interaction.channel.send('Please enter a question');
        }
       // message.delete();
        const embed = new DiscordJS.EmbedBuilder()
            .setTitle('š - ' + question)
            .setDescription(`š - ${mainArray[1]} \n\nš - ${mainArray[2]}`)
            .setColor(embedColor);
        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            
        try{
            await message.react('š');
            await message.react('š');
            await message.react('š');
        } catch(error){
            console.error('error: ', error);
        }
    } else {
       // message.delete();
        
        
        const options = [];
        var j = 0;
        for (let i = 1; i < mainArray.length; i++) {
            options.push(mainArray[i]);
                j++;
            }
         
        
        const arr = [];
        //options[j] = array;
        if (options.length > alphabet.length) {
            return await interaction.channel.send('Please don\'t input more than 26 options.').then(sent => {
                setTimeout(() => {
                    sent.delete();
                }, 2000);
            });
        }
        const question = mainArray[0];
        const embed = new DiscordJS.EmbedBuilder(); 
        
        let count = 0;
        options.forEach(option => {
            arr.push(alphabet[count] + ' ' + option.join(' '));
            count++;
        });
    embed
        .setTitle('š  - ' + question)
        .setDescription(arr.join('\n\n'))
        .setColor(embedColor);

    const message = await interaction.reply({ embeds: [embed], fetchReply: true});
    try{    
        for(let i = 0; i < options.length; i++) {
                await message.react(`${alphabet[i]}`);
            }
        //msg.react(() => msg.react('š'));
    }catch(error){
        console.error('error: ', error);
    }
}
}

exports.poll = poll;
//# sourceMappingURL=index.js.map